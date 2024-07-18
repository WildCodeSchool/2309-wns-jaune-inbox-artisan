const MailTitle = ( {level, text}: {level: Number, text: String}) => {
  switch (level) {
    case 1:
      return <h1>{text}</h1>;
    case 2:
      return <h2>{text}</h2>;
    case 3:
      return <h3>{text}</h3>;
    case 4:
      return <h4>{text}</h4>;
    case 5:
      return <h5>{text}</h5>;
    case 6:
      return <h6>{text}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}


/*

const Header = (level, title, subtitle) => {
return (<><Title level={level}>{text}</Title></>) 
}

*/

export default MailTitle