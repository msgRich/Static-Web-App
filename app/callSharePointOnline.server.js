const bearerCode = null

export async function getSPListItems(listName, Query){
	// First get the bearer token if it doesn't already exist.
	const bearerToken = bearerCode || await getBearer();
	// Next generate an access token using the addin tokens
	const accessToken = await getAccessToken(bearerToken);
	// Finally get list items from the requested list.;
	const listItems = await getListItems(accessToken.access_token,listName);
	if(listItems) return listItems
	return null
}


const getBearer = async () => {
    const response = await fetch('https://tucker.sharepoint.com/_vti_bin/client.svc', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer'
		},
	})
	const host = response.headers.get("www-authenticate");
	const headObj = host.split(',');
	const bearerRealm = headObj[0].split('=')[1];
	const clientId = headObj[1].split('=')[1];
    // getAccessToken(bearerRealm.replace(/['"]+/g, ''));
	return bearerRealm.replace(/['"]+/g, '')
}


const getAccessToken = async (bearer) => {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
	const urlencoded = new URLSearchParams();
	urlencoded.append("grant_type", "client_credentials");
	urlencoded.append("client_id", `20f6173b-bfb0-4d31-b821-d6aaea32cabd@${bearer}`);
	urlencoded.append("client_secret", "dh+n+ERzzP9KEcVNDZ0EGkXjBX6CeouEFMChWkYx6SU=");
	urlencoded.append("resource", `00000003-0000-0ff1-ce00-000000000000/tucker.sharepoint.com@${bearer}`);

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: urlencoded,
		redirect: "follow"
	};

    try {
        const fetchResponse = await fetch(`https://accounts.accesscontrol.windows.net/${bearer}/tokens/OAuth/2`, requestOptions);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        console.log(e)
    }  
 
}


const getListItems = async (accessToken,listName) => {
	const myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${accessToken}`);
	myHeaders.append("Accept", "application/json;odata=verbose");
	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow"
	};

  try {
	const fetchResponse = await fetch(`https://tucker.sharepoint.com/sites/Website/_api/web/getlistbytitle('${listName}')/items`, requestOptions);
	const data = await fetchResponse.json();
	return data.d.results;
} catch (e) {
	console.log(e)
} 
}