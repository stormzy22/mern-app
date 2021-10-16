<h2>
<button><a href="https://github.com/adrianhajdin/project_mern_memories.git"><h4>Click Here</h4></a></button> for the original code.
<br/>
</h2>

<br/>

<h1><u>Reqirements</u></h1>
<h2>Step 1:</h2>
<h3>
Create a .env file in the root of the client dir
</h3>
<br/>
<h3>The .env would include the following::</h3>

<pre>
REACT_APP_AXIOS_BASE_URL=<b><a>http://localhost:8000/api/v3</a></b>

REACT_APP_CLOUDINARY_NAME=<b>your cloudinary cloud name</b>
</pre>

<div > To start the client side open your terminal then cd into the client dir and run the following command::
<br/>
<pre><h3>yarn start || npm run start</h3></pre>
</div>
<br/>
<h2>Step 2:</h2>
<h3>
Create a .env file in the root of the server dir
</h3>
<br/>
<h3>The .env would include the following::</h3>

<pre>
JWT_SECRETE=

NODE_ENV?= "development" | "production";

PorT=8000

PWD?=

MONGO_DB_NAME=

MONGO_DB_USER=

MONGO_DB_PASS=

CLOUDINARY_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRETE=

GOOGLE_CLIENT_ID=
</pre>
<h3>
To start the server run the following command:
<pre>yarn start || npm run start</pre>
</h3>
