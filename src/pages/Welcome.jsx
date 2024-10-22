import LogoSide from "../component/LogoSide"; // adjust the import path if necessary
import WelcomeSide from "../component/WelcomeSide";
import { motion } from "framer-motion";

function Welcome() {
  return (
    <motion.div
      initial={{ opacity: 1, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-5">
        <LogoSide />
        <WelcomeSide />
      </div>
    </motion.div>
  );
}

export default Welcome;
