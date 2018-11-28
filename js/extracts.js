//# for filtering
function filterTitle(search, locations) {
  return locations.filter(({ title }) => {
    const re = RegExp(`(${search})`, 'g')
    return re.test(title)
  })
}

function filterCategory(search, locations) {
  return locations.filter(({ category }) => {
    const re = RegExp(`(${search})`, 'g')
    return re.test(category.join(','))
  })
}



//# in locations
valuesAsObservables.onClick = function () {
  console.log(`clicked ${valuesAsObservables.title()}`)
}