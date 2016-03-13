# angularstore
Programming assignment III in Web Programming II (Reykjavik University)

## Implementation

This app is implemented using the AngularJS JavaScript front-end framework. Libraries such as Angular Material were used in the process to get the look nice and sweet.

## Authors

 - Arnar Leifsson 

 - Björgvin Birkir Björgvinsson

## Instructions

  - In order to run the application you need to have Node.js setup on your computer along with bower package manager
  - When receiving the project at first it is missing all of it's dependencies (usually located in node_modules AND/OR bower_components), so in order to get the dependencies you need to execute the following commands: 1. npm install, 2. bower install .. Those two will download all the dependencies neccessary to run the application
  - When you have installed all the dependencies you can run simply 'gulp' which will run the default gulp task - when gulp has ran through all it's tasks it will open a tab in Chrome browser.
  - In the application you can change between Icelandic and English language (located in the right-top corner)
  - At the main site you have a list of all possible sellers which can be ordered by both name and categories, by pressing the table header depending on which you want to order by.
  - There you can also add a seller by clicking the 'Add Seller' button, also you can edit an existing seller by clicking the edit icon, which is in the right of all seller items in the table
  - In order to unit test you can execute: 'karma start' and the code coverage should display in folder /coverage located in the root folder, sometimes there are problems getting the karma-coverage to work so in our case it was necessary to install karma-coverage globally (npm install karma-coverage -g)
  - In the list of all possible sellers you can click the name of the seller to get it's detail page
  - In the detail page of the seller you can add a new product to the seller by pressing the 'Add product' button, as well as edit existing products by pressing the edit icon located in each product card
  - There are two tabs, one which says 'Products' where all the products of the seller are displayed and also the 'Top 10' tab which holds top 10 most sold products of the seller.
