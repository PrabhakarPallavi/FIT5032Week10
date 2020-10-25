using FIT5032Week10.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FIT5032Week10.Interface
{
    interface IUnitRepository1
    {
        IEnumerable<Unit> GetAll();
        Unit Get(int id);
        Unit Add(Unit item);
        bool Update(Unit item);
        bool Delete(int id);
    }
}
