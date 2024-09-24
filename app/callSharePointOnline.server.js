
export async function getBearer(){
    const response = 
    await fetch('https://tucker.sharepoint.com/_vti_bin/client.svc', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer'
		},
	})
	const host = response.headers.get("www-authenticate");
	const headObj = host.split(',');
	const bearerRealm = headObj[0].split('=')[1];
	const clientId = headObj[1].split('=')[1];
	console.log(bearerRealm);
	console.log(clientId);
    // getAccessToken(bearerRealm);
}


export async function getAccessToken(bearer){
    const response = 
    await fetch(`https://accounts.accesscontrol.windows.net/${bearer}/tokens/OAuth/2`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
	})
	const host = response.headers.get("www-authenticate");
	const headObj = host.split(',');
	const bearerRealm = headObj[0].split('=')[1];
	const clientId = headObj[1].split('=')[1];
	console.log(bearerRealm);
	console.log(clientId);
    
}
