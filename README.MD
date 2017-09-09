# One (Blackwell Enterprise)

# Useful links
http://materializecss.com/
https://material.io/icons/
http://www.sassmeister.com/
https://one-admin-local.avizia.com:1443/template/
https://clients.viget.com/avizia/blackwell/
Blackwell Document
https://docs.google.com/document/d/140rQtKY7mtWa_-G0ewrEo80i5MHvhq9qnbd79m-Wh4Q/edit#heading=h.flk7au8ou9v
# reset database ./run shell
```
./run resetdb
```

# reset database manually ./run shell
```
node db/enterprise/delete.js delete
node db/one/delete.js delete
node db/one/migrate.js current
node db/one/migrate.js seed local.sql
node db/enterprise/migrate.js current
node db/enterprise/migrate.js seed local.sql
```

# drop databases manually ./run psql
```
\c postgres;
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname IN ('one', 'enterprise') AND pid <> pg_backend_pid();
DROP DATABASE one;
DROP DATABASE enterprise;
\pset pager off
\! clear
\q

```

# dev db access
```
sudo su - postgres
psql -d one_dev
```

# command to run lint and test across all projects
```
Running the following command in shell of one project lists a lot of 'minor' linting and reference issues. Please run it before your next commit. thank you.

gulp lib-lint
gulp lib-unit
gulp lib-integration

gulp admin-lint
gulp admin-unit
gulp admin-integration
gulp admin-functional

gulp api-lint
gulp api-unit
gulp api-integration                 

gulp enterprise-lint
gulp enterprise-unit
gulp enterprise-integration
gulp enterprise-functional

gulp patients-lint
gulp patients-unit
gulp patients-integration

gulp sites-lint
gulp sites-unit
gulp sites-integration

```


#Script for Truncate Tables in one
```
TRUNCATE TABLE enterprises;
TRUNCATE TABLE databases;
TRUNCATE TABLE database_servers;
TRUNCATE TABLE roles;
TRUNCATE TABLE admins;
TRUNCATE TABLE admins_roles;
TRUNCATE TABLE sites;
TRUNCATE TABLE modules;
TRUNCATE TABLE portals;
TRUNCATE TABLE api_keys_enterprises;
TRUNCATE TABLE mobile_versions;
TRUNCATE TABLE mobile_html_versions;
```

#Script General
```
SELECT table_name FROM information_schema.tables WHERE table_schema='public';
```


-- ENVIRONMENT SETUP - ON UBUNTU 64--

#INSTALL DOCKER

```
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates
sudo apt-key adv \
               --keyserver hkp://ha.pool.sks-keyservers.net:80 \
               --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
```               

Ubuntu version	            Repository
Trusty 14.04 (LTS)	deb     https://apt.dockerproject.org/repo ubuntu-trusty main
Wily 15.10	deb             https://apt.dockerproject.org/repo ubuntu-wily main
Xenial 16.04 (LTS)	deb     https://apt.dockerproject.org/repo ubuntu-xenial main

```
echo deb https://apt.dockerproject.org/repo ubuntu-xenial main | sudo tee /etc/apt/sources.list.d/docker.list

sudo apt-get update

apt-cache policy docker-engine
```

#Install recommended packages

```
sudo apt-get install linux-image-extra-$(uname -r) linux-image-extra-virtual
sudo apt-get update
```
#Install docker-engine
```
sudo apt-get install docker-engine
```

# Start docker doemon
```
sudo service docker start
```
#Verify that docker is installed correctly by running the hello-world image.
```
sudo docker run hello-world
```
#Manage Docker as a non-root user
```
sudo groupadd docker
sudo usermod -aG docker $USER
```
#Log out and log back in so that your group membership is re-evaluated.
#Verify that you can docker commands without sudo.
```
docker run hello-world
```

#Install docker-compose

https://docs.docker.com/compose/install/
https://docs.docker.com/machine/install-machine/
```
curl -L https://github.com/docker/compose/releases/download/1.11.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```
Note: If you get a “Permission denied” error, your /usr/local/bin directory probably isn’t writable and you’ll need to install Compose as the superuser. Run sudo -i, then the two commands below, then exit.

#Test the docker compose installation.
```
docker-compose --version
```
#Install docker-machine

```
curl -L https://github.com/docker/machine/releases/download/v0.9.0/docker-machine-`uname -s`-`uname -m` > /usr/local/bin/docker-machine
chmod +x /usr/local/bin/docker-machine
```
Otherwise, download one of the releases from the docker/machine release page directly.
Check the installation by displaying the Machine version:
```
docker-machine version
```

#Install virtualbox

http://askubuntu.com/questions/367248/how-to-install-virtualbox-from-command-line
```
sudo apt-get install virtualbox
```

#Give executable rights on checked out code folder
```
cd one
chmod +x run
```
./run setup

# To ssh into docker machine
```
./run shell
```
# To check servers status
```
http://one-local.avizia.com:2000
or localhost:2000
```
# To make sure all services are running run
```
./run update
```

-- MISC INSTALLATION - ON UBUNTU 64--

#INSTALL Pgadmin 3
# To install pgadmin 3
```
sudo apt-get install pgadmin3
```


#SSH into DEV/TEST Box
cd ~/git/one
chmod 0400 ops/playbooks/keys/kp_dev.pem
ssh -i ops/playbooks/keys/kp_dev.pem ubuntu@34.193.18.110

sudo su postgres
psql
\c enterprise_dev
\c one_dev
\c enterprise_test
\c one_test
\q
exit

# Script files management
```
On the dev and test environments it always drop and recreate the whole schema. It only runs the scripts inside the current schema and data files.
The seed data files are then run next to populate the database with some specific familiar content for testing.
The releases scripts are only run against staging and production to upgrade the database from a previous version to the latest to bring them to the correct state without losing any data.

If there is important data or schema changes, it goes to current > data and schema files ( will be used by dev and test environment) as well as release folder ( for production and staging environment).
If we want to add additional data for testing purpose, it goes to current > seed ( depends on environment 'dev.sql', 'test.sql' ).
For release folder we must check IF exist condition as it only upgrade the database.
For current folder no need to add IF exist condition as it recreates the database.
```