import './styles.scss'

const EmptyState = () => {
    return ( 
      <div className="emptystate sm:px-6 lg:px-8 lg:py-6">
        <div className="emptystate--text">
          <h3 className="mt-2 text-2xl font-semibold text-gray-900">
            Select a chat or start a new conversation
          </h3>
        </div>
      </div>
    );
  }
   
  export default EmptyState;