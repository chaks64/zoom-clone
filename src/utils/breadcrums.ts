import { NavigateFunction } from "react-router-dom";
import { BreadcrumsType } from "./Types";

export const getCreateMeetingBreadcrumbs = (
  navigate: NavigateFunction
): Array<BreadcrumsType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "Create Meeting",
  },
];

export const getOneOnOneMeetingBreadcrumbs = (
  navigate: NavigateFunction
): Array<BreadcrumsType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "Create Meeting",
    href: "#",
    onClick: () => {
      navigate("/create");
    },
  },
  {
    text: "Create One on One meeting",
  },
];


export const getVideoConferenceBreadcrumbs = (
    navigate: NavigateFunction
  ): Array<BreadcrumsType> => [
    {
      text: "Dashboard",
      href: "#",
      onClick: () => {
        navigate("/");
      },
    },
    {
      text: "Create Meeting",
      href: "#",
      onClick: () => {
        navigate("/create");
      },
    },
    {
      text: "Create group meeting",
    },
  ];

  export const getMyMeetingsBreadcrums = (
    navigate: NavigateFunction
  ): Array<BreadcrumsType> => [
    {
      text: "Dashboard",
      href: "#",
      onClick: () => {
        navigate("/");
      },
    },
    {
      text: "My Meetings",
    },
  ];

  export const getMeetingsBreadcrums = (
    navigate: NavigateFunction
  ): Array<BreadcrumsType> => [
    {
      text: "Dashboard",
      href: "#",
      onClick: () => {
        navigate("/");
      },
    },
    {
      text: "Meetings",
    },
  ];