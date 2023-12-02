// import React, { useState, useEffect } from "react";
// import { Fade, Slide } from "react-reveal";
// import "../../index.css"; // Assuming you have a separate CSS file for styling
// import { PropagateLoader as Spinner } from "react-spinners"; // Import the Spinner component

// const Home = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulating a delay to demonstrate the preloader
//     const timeout = setTimeout(() => {
//       setLoading(false);
//     }, 2000); // Adjust the delay time as needed

//     return () => clearTimeout(timeout); // Clear timeout on component unmount
//   }, []);

//   return (
//     <div className="App">
//       {loading ? (
//         // Preloader displayed while loading is true
//         <div className="preloader">
//           {/* Replace the text with the Spinner component */}
//           <Spinner size={100} color={"#123abc"} loading={loading} />
//         </div>
//       ) : (
//         // Landing page content displayed once loading is false
//         <div className="landing-page">
//           <header className="navbar">
//             <nav>
//               <ul>
//                 <li>Home</li>
//                 <li>About</li>
//                 <li>Contact</li>
//               </ul>
//             </nav>
//           </header>
//           <main>
//             <div className="welcome-section">
//               <Fade top>
//                 <h1>Welcome to My Website</h1>
//               </Fade>
//               <Slide left>
//                 <p>This is a neat landing page with animations!</p>
//               </Slide>
//             </div>
//           </main>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
