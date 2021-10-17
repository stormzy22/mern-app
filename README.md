<h2>
Pls note that this project is a rebuild. <br/>
<a href="https://github.com/adrianhajdin/project_mern_memories.git">Click Here</a></button> for the original code.
<br/>
</h2>

<br/>

<h1><u>Reqirements</u></h1>
<h2>Step 1:</h2>
<h3>
Cd inside the client dir and
create a .env file in the root of the client dir then provide the following credential in the .env file
</h3>
<br/>

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
Cd inside the root of the server and
create a .env file in the root of the server dir then provide the following credential in the .env file
</h3>
<br/>
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

<ol>
<li>First run the following command to get the compiled version which is in <b>javascript</b>. <br/>
Note:: <mark>if you don't run the first command you can't run the second command successfully</mark>
<pre>yarn build || npm run build</pre></li>
<li>
To start the server run the following command:
<pre>yarn start || npm run start</pre></li>

<li>
To start the typescript version of the server run .
<br/>
this command doesn't require the first command to run.
<pre>yarn dev || npm run dev</pre>
</li>
</ol>
</h3>
