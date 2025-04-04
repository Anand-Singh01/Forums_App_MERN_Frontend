import { ColorRing } from "react-loader-spinner";
const LoaderSpinner = () => {
  return (<div className="flex justify-center items-center size-full">
     <ColorRing
      visible={true}
      height="50"
      width="50"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={["#849b87", "#849b87", "#849b87", "#849b87", "#849b87"]}
    />
  </div>
   
  );
};

export default LoaderSpinner;
