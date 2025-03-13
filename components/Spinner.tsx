import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const Spinner = ({ path = "/login" }) => {
  const [count, setCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000);

    if (count === 0) {
      router.push({
        pathname: path,
        query: { redirect: router.asPath },
      });
    }

    return () => clearInterval(interval);
  }, [count, router, path]);

  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
    >
      <h1 className="text-center text-2xl mb-2">
        Redirecting you in {count}
      </h1>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};

Spinner.propTypes = {
  path: PropTypes.string,
};

export default Spinner;
