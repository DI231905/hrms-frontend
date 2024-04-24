import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    padding: "0.75rem 1.25rem",
    marginBottom: "0",
    borderBottom: "none",
    background: "#ffffff",
    zIndex: "3 !important",
    "&$cardHeaderPlain,&$cardHeaderIcon,&$cardHeaderStats,&$grayCardHeader": {
      margin: "0 !important",
      padding: "0 !important",
      position: "relative",
      color: "#FFFFFF",
    },
    "&:first-child": {
      borderRadius: "20px",
      "&$cardHeader": {
        borderRadius: "20px",
      },
    },
    "&$cardHeaderStats svg": {
      fontSize: "36px",
      lineHeight: "56px",
      textAlign: "center",
      width: "36px",
      height: "36px",
      margin: "10px 10px 4px",
    },
    "&$cardHeaderStats i,&$cardHeaderStats .material-icons": {
      fontSize: "36px",
      lineHeight: "56px",
      width: "56px",
      height: "56px",
      textAlign: "center",
      overflow: "unset",
      marginBottom: "1px",
    },
    "&$cardHeaderStats$cardHeaderIcon": {
      textAlign: "right",
    },
  },
  cardHeaderPlain: {
    marginLeft: "0px !important",
    marginRight: "0px !important",
  },
  cardHeaderStats: {
    "& $cardHeaderIcon": {
      textAlign: "right",
    },
    "& h1,& h2,& h3,& h4,& h5,& h6": {
      margin: "0 !important",
    },
  },
  cardHeaderIcon: {
    "&$grayCardHeader,&$cardHeaderIcon": {
      background: "transparent",
      boxShadow: "none",
    },
    "& i,& .material-icons": {
      width: "33px",
      height: "33px",
      textAlign: "center",
      lineHeight: "33px",
    },
    "& svg": {
      width: "24px",
      height: "24px",
      textAlign: "center",
      lineHeight: "33px",
    },
    "&$grayCardHeader": {
      "& i,& .material-icons": {
        color: "#333333",
      },
    },
  },
  warningCardHeader: {
    color: "#FFFFFF",
    background: "linear-gradient(60deg,#ffa726,#fb8c00)",
    ...theme.cardHeaderWarning,
  },
  successCardHeader: {
    color: "#FFFFFF",
    background: "linear-gradient(60deg,#66bb6a,#43a047)",
    ...theme.cardHeaderSuccess,
  },
  dangerCardHeader: {
    color: "#FFFFFF",
    background: "linear-gradient(60deg,#ef5350,#e53935)",
    ...theme.cardHeaderDanger,
  },
  infoCardHeader: {
    color: "#FFFFFF",
    background: "linear-gradient(60deg,#26c6da,#00acc1)",
    ...theme.cardHeaderInfo,
  },
  primaryCardHeader: {
    color: "#FFFFFF",
    background: "linear-gradient(60deg,#ab47bc,#8e24aa)",
    ...theme.cardHeaderPrimary,
  },
  roseCardHeader: {
    color: "#FFFFFF",
    background: "linear-gradient(60deg,#ec407a,#d81b60)",
    ...theme.cardHeaderRose,
  },
  grayCardHeader: {
    color: "#FFFFFF",
    background: "#999999",
    ...theme.cardHeaderGray,
  },
}));

const PageHeader = ({ className, children, color, plain, stats, icon }) => {
  const classes = useStyles();

  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [classes[className]]: className !== undefined,
  });

  return (
    <Paper elevation={3} className={cardHeaderClasses}>
      {children}
    </Paper>
  );
};

PageHeader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
    "gray",
  ]),
  plain: PropTypes.bool,
  stats: PropTypes.bool,
  icon: PropTypes.bool,
  children: PropTypes.node,
};

export default PageHeader;
