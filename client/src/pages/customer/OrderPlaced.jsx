function OrderPlaced() {
  const ordercontainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  return (
    <div style={ordercontainer}>
      <dotlottie-player
        src="https://lottie.host/012ac47f-1c00-4d16-992e-7793d8076681/TDz7Pl45Cg.lottie"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px" }}
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
}

export default OrderPlaced;
