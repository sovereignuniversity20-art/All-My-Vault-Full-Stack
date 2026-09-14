const Footer = ({onOpenAbout}) => {
    return (
         <footer>
            Shawn Harrell LaunchCode Unit 
            1 Project FT-2026 
            <button className="button" type="button"
            onClick={onOpenAbout}>
                About 💡
            </button>
        </footer>
    );
};

export default Footer;
