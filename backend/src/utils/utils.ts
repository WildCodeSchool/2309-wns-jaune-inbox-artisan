const buildMail = (body: string) => {
	return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.12/dayjs.min.js" integrity="sha512-FwNWaxyfy2XlEINoSnZh1JQ5TRRtGow0D6XcmAWmYCRgvqOUTnzCxPc9uF35u5ZEpirk1uhlPVA19tflhvnW1g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.16.13/antd.min.css"/>
		  <link
      href="https://cdn.jsdelivr.net/npm/antd@5.19.3/dist/reset.min.css"
      rel="stylesheet"
		  />
		  <script src="https://cdn.tailwindcss.com"></script>
      </head>
  	<body>
    ${body}
    </body>
    <script src="https://cdn.jsdelivr.net/npm/antd@5.19.3/dist/antd.min.js"></script>
  </html>
  `;
};

export default buildMail;
