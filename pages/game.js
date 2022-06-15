import { useEffect, useState, useRef } from "react";

const Game = () => {
  const [screen, setScreen] = useState(null);
  const [player, setPlayer] = useState({ position: { x: 50, y: 100 } });
  const canvas = useRef(null);
  useEffect(() => {
    setPlayer({ position: { x: 50, y: 100 } });
  }, []);
  useEffect(() => {
    if (canvas.current) {
      const render = () => {
        const ctx = canvas.current.getContext("2d");
        console.log(4, player.position);
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        ctx.fillStyle = "green";
        ctx.fillRect(player.position.x, player.position.y, 50, 100);
        ctx.fill();
      };
      render();
    }
  }, [player]);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchStartUp = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
    setTimeout(() => {
      setPlayer((prev) => ({ position: { x: prev.position.x, y: prev.position.y + 50 } }));
    }, 500);
    setPlayer((prev) => ({ position: { x: prev.position.x, y: prev.position.y - 50 } }));
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    setPlayer((prev) => ({ position: { x: e.targetTouches[0].clientX, y: prev.position.y } }));
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe) console.log("swipe", isLeftSwipe ? "left" : "right");
    // add your conditional logic here
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(window.screen);
      setScreen({ w: window.screen.availWidth, h: window.screen.availHeight });
    }
  }, []);
  if (!screen) return null;
  return (
    <div id="#gameArea" style={{ overflow: "hidden", maxWidth: "100%" }}>
      <canvas
        style={{
          display: "block",
          marginLeft: "auto",
          backgroundColor: "#000",
          marginRight: "auto",
        }}
        ref={canvas}
        width={screen.w}
        height={screen.h}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          position: "fixed",
          bottom: 0,
        }}
      >
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            width: "100px",
            height: "100px",
            background: "red",
            opacity: 0.1,
            marginLeft: "20px",
            marginBottom: "20px",
          }}
        ></div>
        <div style={{ marginRight: "20px" }}>
          <div
            onTouchStart={onTouchStartUp}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ width: "32px", height: "32px", background: "green" }}
          ></div>

          <div
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ width: "32px", height: "32px", background: "yellow" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Game;
