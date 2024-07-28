import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import hero from '../assets/hero.jpg'
const HeroSection = () => {
  const navigate=useNavigate();
  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated);
  const handleClick=()=>{
         navigate("/signup");
  }
  return (
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5" style={{ paddingLeft: "4em"}}>
      <div className="col-10 col-sm-8 col-lg-6">
        <motion.img
          src={hero}
          className="d-block mx-lg-auto img-fluid"
          alt="Bootstrap Themes"
          width="500"
          height="500"
          loading="lazy"
          style={{ borderRadius: "10px" }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </div>
      <div className="col-lg-6">
        <motion.h1
          className="display-5 fw-bold text-body-emphasis lh-1 mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Welcome to TreasureTrack
        </motion.h1>
        <p className="lead">
          Take control of your finances with ease. Track your income, expenses, and manage your budget seamlessly. Discover a smarter way to handle your money.
        </p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          {!isAuthenticated && <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" style={{ width: '150px' }} onClick={handleClick}>
            Get started
          </button>}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
