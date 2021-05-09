import { Button, Link, Typography } from "@material-ui/core";
import { FindInPage } from '@material-ui/icons'

function Home() {
	return (
		<div>
			<Typography variant="h3">Vitajte v databáze ihrísk</Typography>
			<Typography variant="h4">Databáza ihrísk je projekt tímu FelixBot na súťaž <Link href='https://www.fll.sk'>First Lego League</Link></Typography>
			<Button href="/projects/fll/2021/find" variant="contained" startIcon={<FindInPage />}>
				Vyhľadať ihriská
			</Button>
		</div>
	)
}
export default Home;