import {BounceLoader} from "react-spinners";

const Loader = () => {
    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BounceLoader color="#36d7b7" />
        </div>
    );
};

export default Loader;
