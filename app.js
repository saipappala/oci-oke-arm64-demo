const express = require(&#39;express&#39;);
const { Pool } = require(&#39;pg&#39;);
const app = express();
const port = process.env.PORT || 3000;
const pool = new Pool({
host: process.env.DB_HOST || &#39;postgres-service&#39;,
user: process.env.DB_USER || &#39;postgres&#39;,
password: process.env.DB_PASSWORD || &#39;postgres123&#39;,
database: process.env.DB_NAME || &#39;myapp&#39;,
port: 5432,
});
app.get(&#39;/&#39;, async (req, res) =&gt; {
try {
const result = await pool.query(&#39;SELECT NOW() as current_time, version();&#39;);
res.send(`
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;OCI OKE ARM64 Deployment&lt;/title&gt;
&lt;style&gt;
body { font-family: Arial, sans-serif; margin: 40px; background-color:
#f4f6f9; color: #333; }
.card { background: white; padding: 30px; border-radius: 8px; box-shadow: 0
4px 6px rgba(0,0,0,0.1); }
h1 { color: #1B365D; }
.status { color: #2e7d32; font-weight: bold; }
.meta { font-family: monospace; background: #eee; padding: 10px; border-
radius: 4px; }
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;card&quot;&gt;
&lt;h1&gt;�� Application Deployed Successfully on OCI OKE (ARM6
Architecture)!&lt;/h1&gt;
&lt;p class=&quot;status&quot;&gt;Database Status: Connected (PostgreSQL)&lt;/p&gt;
&lt;hr/&gt;
&lt;p&gt;&lt;strong&gt;Database Time:&lt;/strong&gt; ${result.rows[0].current_time}&lt;/p&gt;
&lt;p&gt;&lt;strong&gt;Database Engine:&lt;/strong&gt;&lt;/p&gt;
&lt;div class=&quot;meta&quot;&gt;${result.rows[0].version}&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
`);
} catch (err) {

res.status(500).send(`
&lt;h1&gt;❌ Database Connection Failed&lt;/h1&gt;
&lt;p&gt;Error details: ${err.message}&lt;/p&gt;
`);
}
});
app.listen(port, () =&gt; {
console.log(`Web application running on port ${port}`);
});
