# Walmart (Product Details)



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