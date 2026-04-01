import { BUILDINGS } from "../data/buildings.js"
import Building from "../entities/building.js"

export const buyBuilding = (buildingKey, gameState) => {
    const buildingUserWantToBuy = BUILDINGS.find(item => item.key === buildingKey)

    if (gameState.balance < buildingUserWantToBuy.cost) {
        return {
            status: "FAILED"
        }
    }

    gameState.city.balance = gameState.city.balance - buildingUserWantToBuy.cost

    const building = new Building({
        name: buildingUserWantToBuy.name,
        key: buildingUserWantToBuy.key,
        role: buildingUserWantToBuy.role,
        type: buildingUserWantToBuy.type,
        description: buildingUserWantToBuy.description,
        capacity: buildingUserWantToBuy.capacity,
        cost: buildingUserWantToBuy.cost,
    })

    gameState.buildings = [...gameState.buildings, building]

    return {
        status: "PURCHASED"
    }
}