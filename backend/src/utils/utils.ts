const buildMail = (body: string) => {
	return `
  <!DOCTYPE html>
  	<body>
    ${body}
    </body>
  </html>
  `;
};

export default buildMail;
