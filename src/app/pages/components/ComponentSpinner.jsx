const ComponentSpinner = () => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "999",
        left: "0",
        top: "0",
        background: "rgb(255,255,255)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="h-26 w-26 animate-spin rounded-full border-b-2 border-blue-600"></div>
    </div>
  );
};

export default ComponentSpinner;
