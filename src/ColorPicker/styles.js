const styles = {
  mainContainer: {
    height: "170px",
    minWidth: "500px",
  },

  mainPaper: {
    width: "100%",
    height: "100%",
  },

  title: {
    textAlign: "center",
    py: "20px",
  },
  colorList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  colorListItem: {
    width: "50px",
    height: "50px",
    padding: 0,
  },
  colorListItemBtn: (option) => ({
    bgcolor: option.color,
    width: "100%",
    height: "100%",
    borderRadius: "6px",
    p: 0,

    "&:hover": {
      bgcolor: option.hoverColor,
      border: "5px solid " + option.activeColorBorder,
    },
    "&.Mui-selected": {
      bgcolor: option.activeColor,
      transform: "scale(1.2)",
    },
    "&.Mui-selected:hover": {
      bgcolor: option.activeColor,
    },
  }),
  colorListItemBtnText: {
    width: "100%",
    textAlign: "center",
    color: "#fff",
  },
};

export default styles;
