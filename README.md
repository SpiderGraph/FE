# Spider Graph

https://spidergraph.netlify.app/

## Project Overview

Spider Graph allows creation of spider graphs. You can visualize your business goals, initiatives, timelines, and progress. Lets you express all the ideas you’re going to tackle, and organize them by priority and steps.

## Key Features

### Graph Creation

User can create a new graph selecting the number of arms, points and datasets. Each arm can have points starting from 1 and user can add more as needed. The graph also can include several datasets, that are a polygon with the selected color.

![](create-graph.gif)

### Graph Editing

When editing user can choose an arm that needs to be modified. By hovering an arm it will be highlighted, and after clicking the data that includes arm`s title and labels will be filled back in the form for the next changes

![](update-graph.gif)


### Managing the parts of the graph

User can delete arms and points from the menu under the form. 

Some rules are applied to deletion:

* If the point that associated with the edge of the dataset is deleted, then dataset part on that arm will be removed
* if the point that is not the edge of the dataset is deleted, then all datasets that is greater than this point will be reduced

![](delete-parts.gif)

### Fuzzy search

![](filter.gif)

## Tech Stack

### Front end built using:

* React
* Redux
* TypeScript
* Axios
* Formik
* Yup

### Backend built using:

* Node
* Express
* Mongoose

