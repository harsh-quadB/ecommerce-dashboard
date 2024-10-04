function DealsTable() {
    const deals = [
      {
        product: 'Apple Watch',
        location: '6096 Marjolaine Landing',
        dateTime: '12.09.2019 - 12.53 PM',
        piece: '423',
        amount: '$34,295',
        status: 'Delivered',
      },
      // Add more deals as needed
    ];
  
    return (
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Deals Details</h2>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>October</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="pb-4">Product Name</th>
                <th className="pb-4">Location</th>
                <th className="pb-4">Date - Time</th>
                <th className="pb-4">Piece</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                      <span>{deal.product}</span>
                    </div>
                  </td>
                  <td className="py-4">{deal.location}</td>
                  <td className="py-4">{deal.dateTime}</td>
                  <td className="py-4">{deal.piece}</td>
                  <td className="py-4">{deal.amount}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full">
                      {deal.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default DealsTable;