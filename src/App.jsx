import { useState } from 'react'

function App() {
  const [groceryItems, setGroceryItems] = useState([
    { id: 1, name: 'Milch', checked: false },
    { id: 2, name: 'Eier', checked: false },
    { id: 3, name: 'Brot', checked: false },
    { id: 4, name: 'Äpfel', checked: false }
  ])
  
  const [activities, setActivities] = useState([
    { id: 1, action: 'checked off', item: 'Butter', user: 'Lisa', time: '2 min ago', type: 'check' },
    { id: 2, action: 'added', item: 'Brot', user: 'Jonas', time: '5 min ago', type: 'add' },
    { id: 3, action: 'added', item: 'Äpfel', user: 'Anna', time: '10 min ago', type: 'add' }
  ])
  
  const [newItem, setNewItem] = useState('')
  const [userName] = useState('Du')

  const addItem = () => {
    if (newItem.trim()) {
      const item = {
        id: Date.now(),
        name: newItem.trim(),
        checked: false
      }
      setGroceryItems([...groceryItems, item])
      
      const activity = {
        id: Date.now(),
        action: 'added',
        item: newItem.trim(),
        user: userName,
        time: 'gerade eben',
        type: 'add'
      }
      setActivities([activity, ...activities])
      
      setNewItem('')
    }
  }

  const toggleItem = (id) => {
    const updatedItems = groceryItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, checked: !item.checked }
        
        if (!item.checked) {
          const activity = {
            id: Date.now(),
            action: 'checked off',
            item: item.name,
            user: userName,
            time: 'gerade eben',
            type: 'check'
          }
          setActivities([activity, ...activities])
        }
        
        return updatedItem
      }
      return item
    })
    setGroceryItems(updatedItems)
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex justify-center items-start relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 animate-pulse bg-gradient-radial from-green-200 to-transparent transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 animate-pulse bg-gradient-radial from-pink-200 to-transparent transform -translate-x-1/3 translate-y-1/3" style={{animationDelay: '2s'}}></div>
      
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl mt-4 relative z-10 border border-white/50">
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-8 tracking-wider text-teal-primary drop-shadow-sm">
          WG-EINKAUFSLISTE
        </h1>
        
        <div className="space-y-8">
          {/* Grocery Section */}
          <div>
            <div className="bg-teal-secondary rounded-3xl py-3 px-6 mb-6 text-center shadow-md">
              <h2 className="text-white text-lg font-semibold tracking-wide">GROCERY LIST</h2>
            </div>
            
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Neues Item hinzufügen..."
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-3xl text-base outline-none transition-all duration-300 bg-white/90 focus:border-teal-secondary focus:ring-4 focus:ring-teal-secondary/20 shadow-sm"
              />
              <button 
                onClick={addItem} 
                className="w-14 h-14 border-none rounded-full bg-teal-secondary text-white text-2xl font-bold cursor-pointer transition-all duration-300 shadow-lg hover:bg-teal-primary hover:shadow-xl active:scale-95 hover:-translate-y-1"
              >
                +
              </button>
            </div>
            
            <div className="space-y-3">
              {groceryItems.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-5 p-4 bg-white/80 rounded-2xl transition-all duration-300 border-2 border-transparent hover:bg-white/95 hover:border-teal-secondary hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                >
                  <button 
                    className={`w-12 h-12 border-4 border-teal-secondary rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center text-xl text-white flex-shrink-0 hover:scale-110 ${
                      item.checked 
                        ? 'bg-teal-secondary shadow-md' 
                        : 'bg-transparent hover:shadow-lg'
                    }`}
                    onClick={() => toggleItem(item.id)}
                  >
                    {item.checked && '✓'}
                  </button>
                  <span className={`text-lg font-medium transition-all duration-300 ${
                    item.checked ? 'line-through text-gray-500 opacity-70' : 'text-gray-800'
                  }`}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* History Section */}
          <div>
            <div className="bg-orange-secondary rounded-3xl py-3 px-6 mb-6 text-center shadow-md">
              <h2 className="text-white text-lg font-semibold tracking-wide">HISTORY</h2>
            </div>
            
            <div className="space-y-3">
              {activities.map(activity => (
                <div 
                  key={activity.id} 
                  className="flex items-center gap-4 p-4 bg-white/80 rounded-2xl transition-all duration-300 hover:bg-white/95 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className={`w-5 h-5 rounded-full flex-shrink-0 ${
                    activity.type === 'check' ? 'bg-purple-500' : 'bg-teal-secondary'
                  }`}></div>
                  <span className="flex-1 text-base text-gray-800 font-medium">
                    {activity.user} {activity.action} {activity.item}
                  </span>
                  <span className="text-sm text-gray-600 italic">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
