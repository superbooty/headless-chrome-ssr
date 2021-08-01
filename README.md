# headless-chrome-ssr

to run this with ES6 you need to run it in experimental mode
node --experimental-modules server.mjs

### Running with apache
```
Apache on MAC OSX can be found in this location
/etc/apache2 could also be /private/etc/apache2

You will need to create a proxy pass into the Node server
Follow instructions here on what to do to edit the httpd.conf file

you will need to uncomment out the proxy modules then setup your vhosts

Make sure this line is uncommented in your httpd.conf file
# Virtual hosts
Include /private/etc/apache2/extra/httpd-vhosts.conf

Make sure these lines are uncommented in httpd.conf
LoadModule proxy_module libexec/apache2/mod_proxy.so
LoadModule proxy_http_module libexec/apache2/mod_proxy_http.so

Add the following to /extra/httpd-vhosts.conf
<VirtualHost *:80>
    ServerName localhost
    ProxyRequests On
    ProxyPass / http://localhost:8000/
    ProxyPassReverse / http://localhost:8000/
</VirtualHost>

Now restart apache server with the following
sudo apachectl restart

To run Apache on work mac you'll first have to get admin previleges elevated

start - sudo apachectl restart
stop - sudo apachectl stop

```


