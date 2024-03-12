# Azure Cloud Resume Challenge

![screenshot of techbrett.net](/frontend/images/site3.png)

# Cloud Resume Challenge for Azure

Welcome to my Cloud Resume Challenge for Azure project! ☁️

Are you ready to embark on an exciting journey into the world of cloud computing with Microsoft Azure? I sure was! After nearly a decade in various IT roles, I felt the need to evolve with the rapidly changing tech landscape, especially the shift towards the cloud.

Initially, I dipped my toes into AWS, but quickly realized I needed a more gradual entry point. That's when Azure caught my attention. I decided to start from the fundamentals and earned my AZ-900 Azure Fundamentals certification in July 2023. After taking a well-deserved break, I committed myself to the Cloud Resume Challenge for Azure.

Over the course of two intense weekends, totaling around 30-40 hours (including some weeknight sessions), I poured my heart and soul into this project. If you're just beginning this challenge, my advice is simple: take your time, absorb the material thoroughly, and document your progress meticulously. Most importantly, relish every moment of this transformative journey.

Whether you're a seasoned pro or a newbie to Azure, I hope my project inspires and helps you on your own cloud computing adventure. Let's dive in together!

# This challenge is composed of 8 main parts:

1. Configure a Static Website via Azure Storage with a custom domain and HTTP
2. Write your resume in HTML and formatting it with CSS
3. Setup Azure Storage account and enable Static Website
4. Configure GitHub Actions for CI/CD with Azure Storage
5. Enable CDN for HTTPS access to your website and custom domain
6. Use Azure Functions App to interact with CosmosDB API to update a visitor counter
7. Write javascript to capture the result of the visitor counter function and display it on the site
8. Write a blog entry to document the journey


## Prerequisites
- [Azure account](https://azure.microsoft.com/en-us/free)
- [GitHub account](https://github.com/join)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- - [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local)
- [Visual Studio Code](https://code.visualstudio.com)
  - [Visual Code Extensions](https://code.visualstudio.com/docs/introvideos/extend)
  - [Azure Functions Extensions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
  - [Python Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) or [C# Extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
  - [Azure Storage Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestorage)
- [Python 3.11.5](https://www.python.org/downloads/) or [.NET 7.0](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- Optional
  - [Azure Storage Explorer](https://www.namecheap.com/hosting/shared/)
  - [A cheap shared hosting provider to host a Wordpress blog](https://www.namecheap.com/hosting/shared/)

## Front-end
- The front-end is a static website using HTML, CSS, and JavaScript. I used [this template](https://styleshout.com/free-templates/ceevee/) and modified it
- JavaScript is used to fetch data from CosmosDB via an API call. I walked thru this tutorial by [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data)
  - I added to the main.js to determine and append the appropriate suffix based on what number visitor is currently viewing the site
- I followed Microsoft's documentation on how to [Host a static website on Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website-host)
- I kept going with Microsoft's docs to [Create an Azure CDN profile and endpoint](https://learn.microsoft.com/en-us/azure/cdn/cdn-create-new-endpoint) as a CDN endpoint is used to deliver the site via HTTPS
- And finally I followed this to [Configure HTTPS on an Azure CDN custom domain](https://learn.microsoft.com/en-us/azure/cdn/cdn-custom-ssl) get HTTPS enabled for the custom domain
  - Optionally, you can buy a PositiveSSL cert from [Namecheap](https://www.namecheap.com/security/ssl-certificates/), configure DNS in [Cloudflare](https://www.cloudflare.com/), and use a CNAME record to point the root domain to your CDN endpoint via [CNAME Flattening](https://developers.cloudflare.com/dns/cname-flattening/)
  - This will require importing the certificate into the [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/certificates/tutorial-import-certificate?tabs=azure-portal)
    - Azure requires a .pfx file when importing the cert, and my SSL email only contained .crt and .ca-bundle files. I had to extract the private key from the .crt file, save it as private.key, then use [Chocolatey](https://chocolatey.org/install) to install [openssl](https://community.chocolatey.org/packages/openssl) and then use [openssl to create the .pfx file](https://stackoverflow.com/questions/6307886/how-to-create-pfx-file-from-certificate-and-private-key)
  - If you do this, you may also want to setup an HTTPS redirect rule within your CDN to ensure all requests resolve to HTTPS. [My blog post](https://blog.techbrett.net/?p=240) explains how to do this

## Back-end
The visitor counter uses an Azure Function with an HTTP Trigger and a CosmosDB input and output binding. Each time the site is visited, the function is triggered, retrieves the CosmosDB item, adds 1 to it, saves it, and returns the value as a .json
- I started off by [creating an Azure CosmosDB account, database, container, and items within the portal](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/quickstart-portal). This can also be done [via CLI](https://learn.microsoft.com/en-us/azure/cosmos-db/scripts/cli/nosql/serverless)
- I tried creating the function within the Portal and using the Interaction submenu to do the bindings, but I could not for the life of me get this to work. So I used [Visual Studio Code to create the API and Azure Function](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code?tabs=node-v3%2Cpython-v2%2Cin-process&pivots=programming-language-python)
  - grinntec's guide was a lifesaver for both [creating the API](https://www.grinntec.net/docs/cloudresumechallenge/chunk2-backend/09-create-api-resource/09-create-api-resource-azure/) and [creating the API Function](https://www.grinntec.net/docs/cloudresumechallenge/chunk2-backend/10-create-api-function/10-create-api-function-azure/) within Python
  - I will note that I had problems deploying the code from my azure-resume/backend/api folder like I initially planned. I think there was something leftover from when I tried to do this in C# that it just wouldn't deploy. So I copied the folder created for the Python script to another directory, and deployed it from there with Visual Studio
- This requires using [bindings for Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2?tabs=in-process%2Cextensionv4&pivots=programming-language-python) in order to [retrieve an item](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2-input?tabs=python-v2%2Cin-process%2Cnodejs-v4%2Cextensionv4&pivots=programming-language-python) from the CosmosDB and [write back to it](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2-output?tabs=python-v2%2Cin-process%2Cnodejs-v4%2Cextensionv4&pivots=programming-language-python)
- Once all of that has been setup and I was finally receiving "HTTP response code 200 OK" from GET requests, I had to [allow origins within CORS](https://learn.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings?tabs=portal#cors)
  - You must add the URL for for the Function app (so https://my-function-app.azurewebsites.net), but I also included my custom domain (with www and without), the CDN endpoint (https://my-cdn-endpoint.azureedge.net), and the URL for the storage container endpoint (https://my-storage-account.z13.web.core.windows.net)
  - Be sure to check **_Enable Access-Control-Allow-Credentials_**

## CI/CD
Once I had the storage container and static website setup, it was really nice to be able to push updates via GitHub and have a Workflow automatically update the contents of the container. Plus this workflow purges the CDN cache so that any updates you make are immediately reflected.
- I followed Microsoft's docs on [Using GitHub Actions workflow to deploy a static website in Azure Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-static-site-github-actions?tabs=userlevel) which was mostly straightfoward. However, I ran into a huge roadblock where my workflow couldn't login to my Azure account, despite having the secret in place. I had to use `--auth-mode login` in order for this to authenticate and work properly when using azure/CLI@v1
- I used this quick guide to learn how to [update my GitHub repo from my local drive](https://medium.com/@avivamazurek/how-to-update-a-github-repository-from-your-local-drive-e765eb48a691)
- I didn't implement this yet, but this guide documents [Using GitHub Actions for deploying to Azure Functions](https://github.com/marketplace/actions/azure-functions-action)
