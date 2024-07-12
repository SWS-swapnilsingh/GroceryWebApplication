export default {
    template: `<div>
    <!DOCTYPE html>
<html>
<head>
	<title>Error Page</title>
	<style>
		body {
			background-color: #f2f2f2;
			font-family: Arial, sans-serif;
			font-size: 16px;
			line-height: 1.5;
			color: #333;
			margin: 0;
			padding: 0;
		}
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100vh;
		}
		h1 {
			font-size: 4rem;
			margin: 0;
			padding: 0;
			color: #333;
			text-align: center;
		}
		p {
			font-size: 1.5rem;
			margin: 0;
			padding: 0;
			color: #333;
			text-align: center;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>Oops! Something went wrong.</h1>
		<p>We're sorry, but the page you're looking for cannot be found.</p>
	</div>
</body>
</html>

    </div>`,
    props:['ErrorMessage'],
}