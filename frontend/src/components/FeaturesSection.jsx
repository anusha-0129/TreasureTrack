import React from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useInView } from 'react-intersection-observer';
import exp from '../assets/exp.png';
import currency from '../assets/currency.jpeg';
import incomes from '../assets/incomes.jpeg';
import dashboard from '../assets/dashboard.jpg';
import voice from '../assets/voice.jpg';
const FeaturesSection = () => {
  const [ref1, inView1] = useInView({
    triggerOnce: true,
    threshold: 0.5, 
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.5, 
  });

  const [ref3, inView3] = useInView({
    triggerOnce: true,
    threshold: 0.5, 
  });

  const [ref4, inView4] = useInView({
    triggerOnce: true,
    threshold: 0.5, 
  });

  const [ref5, inView5] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="container-fluid py-5">
      <p style={{fontSize:"2.5rem",textAlign:"center",fontWeight:"bold"}}>Explore the features of TreasureTrack</p>
      <div className="row align-items-center" style={{paddingLeft:"2rem"}}>
      <motion.div
        className="row align-items-center"
        ref={ref1}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: inView1 ? 1 : 0, x: inView1 ? 0 : -100 }}
        transition={{ duration: 0.8 }}
      >
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">Expenses</h2>
          <p className="lead">
            Track all your expenses effortlessly. Categorize and manage your spending with ease.Keep your financial records organized and accessible.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src={exp}
            alt="Expenses"
            className="img-fluid"
            style={{width:"30em",height:"30em",borderRadius:"15px"}}
          />
        </div>

      </motion.div>
      </div>
      <div className="row align-items-center">
      <motion.div
        className="row align-items-center mt-5"
        ref={ref2}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: inView2 ? 1 : 0, x: inView2 ? 0 : 100 }}
        transition={{ duration: 0.8 }}
      >
        <div className="col-md-6">
          <img
            src={incomes}
            alt="Incomes"
            className="img-fluid"
            style={{width:"25em",height:"25em",borderRadius:"15px"}}
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">Incomes</h2>
          <p className="lead">
            Monitor your income sources and keep track of your earnings effortlessly.View comprehensive summaries of your financial inflows.
          </p>
        </div>
      </motion.div>
      </div>
      <div className="row align-items-center">
      <motion.div
        className="row align-items-center mt-5"
        ref={ref3}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: inView3 ? 1 : 0, x: inView3 ? 0 : -100 }}
        transition={{ duration: 0.8 }}
      >
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">Voice Commands</h2>
          <p className="lead">
            Add expenses or incomes using your voice. Experience hands-free finance tracking. Simplify data entry with intuitive voice recognition technology.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src={voice}
            alt="Voice Commands"
            className="img-fluid"
            style={{width:"25em",height:"25em",borderRadius:"15px"}}
          />
        </div>
      </motion.div>
     </div>
     <div className="row align-items-center">
      <motion.div
        className="row align-items-center mt-5"
        ref={ref4}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: inView4 ? 1 : 0, x: inView4 ? 0 : 100 }}
        transition={{ duration: 0.8 }}
      >
        <div className="col-md-6">
          <img
            src={currency}
            alt="Currency Converter"
            className="img-fluid"
            style={{width:"25em",height:"25em",borderRadius:"15px"}}
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">Currency Converter</h2>
          <p className="lead">
            Convert currencies instantly and accurately. Stay updated with live exchange rates. Enhance global financial management with real-time currency data.
          </p>
        </div>
      </motion.div>
    </div>
    <div className="row align-items-center">
      <motion.div
        className="row align-items-center mt-5"
        ref={ref5}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: inView5 ? 1 : 0, x: inView5 ? 0 : -100 }}
        transition={{ duration: 0.8 }}
      >
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">Dashboard</h2>
          <p className="lead">
          Visualize your financial data beautifully. Get insights and make informed decisions with interactive charts and graphs.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src={dashboard}
            alt="Dashboard"
            className="img-fluid"
            style={{width:"25em",height:"25em",borderRadius:"15px"}}
          />
        </div>
      </motion.div>
    </div>
    </div>
  );
};

export default FeaturesSection;
