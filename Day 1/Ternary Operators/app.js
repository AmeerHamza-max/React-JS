let showRecipe=false;
function getRecipeOne(recipeName){
    return recipeName;
}
function getRecipeTwo(recipeName){
    return recipeName;
}

if(showRecipe){
    console.log(getRecipeOne('Pizza'));
    
}
else{
    console.log(getRecipeTwo("Coke"));
    }


// condition ? Statment : Statement2 



showRecipe ? console.log(getRecipeOne('Pizza')):console.log(getRecipeTwo("Coke"));
