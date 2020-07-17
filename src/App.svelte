<script>
  	import { Router, Route, Link } from "svelte-routing";
	import Home from "./pages/Home.svelte";
  	import About from "./pages/About.svelte";
  	export let url = "";
	export let name;
</script>

<main>
	<Router url="{url}">
	<nav>
		<Link to="/">Home</Link>
		<Link to="about">About</Link>
	</nav>
	<div>
		<Route path="about" component="{About}" /> 
		<!--for now the router just support case sensitive,
			one workaround colud be add two time the route
			Example.
		<Route path="About" component="{About}" /> 
		-->
		<Route path="/"><Home /></Route>
	</div>
	</Router>

	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>