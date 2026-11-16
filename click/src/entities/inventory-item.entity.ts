// STEP 4: InventoryItem entity -> link table Player <-> Item
// Columns: id, playerId, itemId, quantity (default 1)
// Add a ManyToOne relation to Item and a unique constraint on playerId + itemId.
