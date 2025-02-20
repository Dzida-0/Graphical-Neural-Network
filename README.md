# Graphical-Neural-Network

# Idea 
## Overview
Simple web app writen in c# build from 3 segments. 
1. Home 
2. Simple ML 
3. More complex ML
On page 2 and 3 there will be wizual site of page where user can move corcles to
build leyers of neural network, adicionali on page 2 there will be complex wizualization 
and on page 1 ther will be plot with points and sliders  
## Page 1 
- graphical building of neural network with movable cicles
- graph representing points and result of its clasification
- sliders to manualyy change waits and bieses
- options to change points generation settings
- For running on azure: trening localy in webpage with js or on  azure ML
- For runing localy: traing on CPU or GPU
## Page 2
- graphical building of neural network with movable cicles
- representation of simulation
- options to change simulation settings
- For running on azure: trening localy in webpage with js or on  azure ML
- For runing localy: traing on CPU or 
## Home 
- links to oder pages 
- benchmark test between 2 metods
## Adicional info
- test included
- ci for test and style
- cd for deploymet with docker and kubernetes to azure and azure ML
- LESS for style 


# Idea 2
project/
??? frontend/
?   ??? components/
?   ?   ??? HomePage.js
?   ?   ??? TrainingPage1.js
?   ?   ??? TrainingPage2.js
?   ?   ??? DragDropNetwork.js
?   ?   ??? Visualization.js
?   ?   ??? global.less
?   ??? tests/
?       ??? e2e/
?       ?   ??? TrainingPage1.test.js
?       ?   ??? TrainingPage2.test.js
?       ??? mock-data/
??? backend/
?   ??? Controllers/
?   ?   ??? HomeController.cs
?   ?   ??? TrainingController.cs
?   ?   ??? ConfigurationController.cs
?   ??? Models/
?   ?   ??? NeuralNetwork.cs
?   ?   ??? MLNetModel.cs
?   ?   ??? TrainingConfig.cs
?   ??? Services/
?   ?   ??? LocalTrainingService.cs
?   ?   ??? AzureTrainingService.cs
?   ?   ??? VisualizationService.cs
?   ?   ??? SlackNotificationService.cs
?   ??? Utils/
?   ?   ??? DataLoader.cs
?   ?   ??? Logger.cs
?   ?   ??? MetricsCalculator.cs
?   ??? tests/
?   ?   ??? unit/
?   ?   ?   ??? NeuralNetwork.test.cs
?   ?   ?   ??? TrainingConfig.test.cs
?   ?   ??? integration/
?   ?       ??? BackendFrontendIntegration.test.cs
?   ??? appsettings.json
??? shared/
?   ??? datasets/
?   ?   ??? example-dataset.csv
?   ??? kernels/
?   ?   ??? custom-cuda-kernel.cu
?   ?   ??? custom-rocm-kernel.cl
??? deployment/
?   ??? Dockerfile.backend
?   ??? Dockerfile.frontend
?   ??? docker-compose.yml
?   ??? backend-deployment.yaml
?   ??? frontend-deployment.yaml
?   ??? backend-service.yaml
?   ??? frontend-service.yaml
?   ??? horizontal-scaler.yaml
?   ??? aml-config.json
??? .github/
?   ??? workflows/
?       ??? main.yml
??? docs/
?   ??? README.md
?   ??? HomePageGuide.md
?   ??? TrainingPage1Guide.md
?   ??? TrainingPage2Guide.md
?   ??? BackendArchitecture.md
?   ??? FrontendArchitecture.md
?   ??? TestingGuide.md
?   ??? CI/CDGuide.md

