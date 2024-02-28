import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
  EuiIcon,
} from "@elastic/eui";
import { logo, animate, google, github } from "../assests/export";
import "../App.css";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth, userRef } from "../utils/firebaseConfig";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../app/slices/auth";

interface Props {
  // Add your prop types here
}

const Login: React.FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  const loginHandler = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);
    dispatch(setUser({ uid, email: email, name: displayName }));
    checkUser(displayName, email, uid);
    navigate("/");
  };

  const checkUser = async (
    displayName: string | null,
    email: string | null,
    uid: string
  ) => {
    if (email) {
      const fireStoreQuery = query(userRef, where("uid", "==", uid));
      const fetchedUsers = await getDocs(fireStoreQuery);
      if (fetchedUsers.docs.length === 0) {
        await addDoc(userRef, {
          uid,
          name: displayName,
          email,
        });
      }
    }
  };

  // const githubHandler = async () => {
  //   const provider = new GithubAuthProvider();
  //   const data = await signInWithPopup(firebaseAuth, provider);
  //   console.log(data);
  // };

  return (
    <EuiProvider colorMode="dark">
      <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup alignItems="center" justifyContent="center">
              <EuiFlexItem>
                <EuiImage src={animate} alt="Animate" />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiImage src={logo} alt="Logo" size={"230px"} />

                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>One Platform to</EuiTextColor>
                    <EuiTextColor color="#0b5cff"> connect</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />

                <EuiFlexGroup
                  alignItems="center"
                  justifyContent="center"
                  direction="row"
                >
                  <EuiFlexItem grow={false}>
                    <EuiButton className="login-logo" onClick={loginHandler}>
                      <EuiIcon type={google} size="xxl"></EuiIcon>
                    </EuiButton>
                  </EuiFlexItem>

                  <EuiFlexItem grow={false}>
                    <EuiButton className="login-logo">
                      <EuiIcon type={github} size="xxl"></EuiIcon>
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
};

export default Login;
