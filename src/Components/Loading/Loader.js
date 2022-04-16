import {ThreeDots} from 'react-loader-spinner';
import s from './Loader.module.css';

function Loading() {
  return (
    <ThreeDots
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={10000} //100 secs
      className={s.loaderContainer}
    />
  );
}

export default Loading;