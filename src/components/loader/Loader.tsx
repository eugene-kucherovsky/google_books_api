import "./Loader.scss";

export default function Loader() {
  return (
    <div className="circles-loader" data-testid="circles-loader">
      <div className="circle">
        <div className="circle__one"></div>
        <div className="circle__two"></div>
        <div className="circle__three"></div>
      </div>
    </div>
  );
}
