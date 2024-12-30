const xlsx = require('xlsx');
const path = require('path');
const ScriptService = require('../services/ScriptService');

class ScriptController {
  async importData(req, res) {
    try {
      if (!req.file) {
        return res.handler.badRequest('No file uploaded');
      }

      const buffer = req.file.buffer;
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = xlsx.utils.sheet_to_json(worksheet);

      let ingredients = new Set();
      let indianFoodData = [];
      let ingredientsArray = [];
      jsonData.forEach((eachData) => {
        indianFoodData.push({
          name: eachData?.name,
          dietType: eachData?.dietType || null,
          prepTime: eachData?.prepTime || null,
          cookTime: eachData?.cookTime || null,
          flavourProfile: eachData?.flavourProfile || null,
          courseType: eachData?.courseType || null,
          state: eachData?.state || null,
          region: eachData?.region || null,
        });

        let ingredientsData = eachData.ingredients.split(',');
        for (let eachIng of ingredientsData) {
          if (eachIng.trim().toLowerCase()) ingredients.add(eachIng.trim().toLowerCase())
        }
      });

      await ScriptService.importDataToIndianFood(indianFoodData);

      ingredients.forEach((each) => {
        ingredientsArray.push({
          name: each.trim()
        })
      })
      await ScriptService.importDataToIngredients(ingredientsArray);

      const fetchedIngredientsData = await ScriptService.findIngredients();

      const fetchedFoodsData = await ScriptService.findFoods();

      let mapData = {};
      let mapFoodData = {}
      fetchedIngredientsData.forEach((each) => {
        mapData[each.name] = each.id
      })

      fetchedFoodsData.forEach((each) => {
        mapFoodData[each.name] = each.id
      })

      let foodIngredientData = [];

      jsonData.forEach((eachData) => {
        let ingredientsData = eachData.ingredients.split(',');
        let foodId = mapFoodData[eachData.name]
        ingredientsData.forEach((each) => {
          if (each.trim()) {
            foodIngredientData.push({
              foodId,
              ingredientId: mapData[each.trim().toLowerCase()]
            });
          }
        });
      })

      await ScriptService.importFoodIngredients(foodIngredientData)

      res.handler.success('Data imported successfully!')

    } catch (error) {
      console.log('🚀 ~ ScriptController ~ importData ~ error:', error);
      return res.handler.internalServerError('Internal Server error!');
    }
  }
}

module.exports = new ScriptController();