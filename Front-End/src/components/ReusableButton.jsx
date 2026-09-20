const ReusableButton = ({label, onClick, variant, ...props}) => {
    return (
    <button type="button" onClick={onClick}>{label}</button>
)};

export default ReusableButton;


