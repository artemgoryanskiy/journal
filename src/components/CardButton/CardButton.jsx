import "./CardButton.css";

function CardButton({ children, className }) {
  const cl = className ? `card-button ${className}` : "card-button";
  return <button className={cl}>{children}</button>;
}

export default CardButton;
