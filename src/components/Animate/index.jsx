import React, { useEffect, useRef, useState } from "react";
import styles from "./animate.module.css";

const AnimatedElement = ({ children, animation }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          let el = entry.target;

          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            if (!el.classList.contains(animation)) {
              console.log("Animation added");
              el.classList.add(animation);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect(elementRef.current);
  }, [animation]);

  return (
    <div ref={elementRef} className={`animate__animated ${styles.container} `}>
      {children}
    </div>
  );
};

export default AnimatedElement;

//

//

// const AnimatedElement = ({ children, animation }) => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           let el = entry.target;

//           if (
//             entry.isIntersecting &&
//             Math.floor(entry.intersectionRatio) === 1
//           ) {
//             if (!el.classList.contains(animation)) {
//               console.log("Animation added");
//               el.classList.add(animation);
//             }
//             // entry.target.classList.add("animate__animated", animation);
//           }
//           //  else {
//           //   entry.target.classList.remove("animate__animated", animation);
//           //   console.log("Animation removed");
//           // }
//         });
//       },
//       { threshold: 1 }
//     );

//     observer.observe(elementRef.current);

//     return () => observer.unobserve(elementRef.current);
//   }, [animation]);

//   return (
//     <div ref={elementRef} className="animate__animated">
//       {children}
//     </div>
//   );
// };

// export default AnimatedElement;

//

//

// var boxes = document.getElementsByClassName("box");
// var counter = document.getElementById("counter");
// var count = 0;

// var observeOptions = {
//   root: null,
//   margin: "0px",
//   threshold: 1.0,
// };

// var onObserve = function (entries, observer) {
//   entries.forEach((entry) => {
//     var el = $(entry.target);
//     if (entry.isIntersecting && Math.floor(entry.intersectionRatio) === 1) {
//       /*
//       If you dont' check intersectionRatio ratio === 1,
//       the observed element will trigger the callback twice,
//       because when immediately passing/leaving 100% threshold,
//       observer will trigger isIntersecting = true,
//       intersectionRatio ~= 0.9 (maybe bug).

//       Chrome somehow gets intersectionRatio slightly above 1 on
//       the first box, so floor the value
//       */
//       count += 1;
//       counter.innerHTML =
//         "# of times box came into full view of viewport: " + count;
//       if (!el.hasClass("animated bounceIn")) {
//         el.addClass("animated bounceIn");
//       }
//     }
//   });
// };

// var observe = new IntersectionObserver(onObserve, observeOptions);

// observe.observe(boxes[0]);
// observe.observe(boxes[1]);
// observe.observe(boxes[2]);
// observe.observe(boxes[3]);
// observe.observe(boxes[4]);
// observe.observe(boxes[5]);
// observe.observe(boxes[6]);
