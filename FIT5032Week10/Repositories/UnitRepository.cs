using FIT5032Week10.Interface;
using FIT5032Week10.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FIT5032Week10.Repositories
{
    public class UnitRepository : IUnitRepository1
    {
        UnitDatabaseEntities db = new UnitDatabaseEntities();

        public Unit Add(Unit item)
        {
            if (item == null) { throw new ArgumentNullException("item"); }
            // TO DO : Code to save record into database
            db.Units.Add(item);
            db.SaveChanges();
            return item;
        }

        public bool Delete(int id)
        {
            //throw new NotImplementedException();
            Unit units = db.Units.Find(id);
            db.Units.Remove(units);
            db.SaveChanges();
            return true;
        }

        public Unit Get(int id)
        {
            return db.Units.Find(id);
        }

        public IEnumerable<Unit> GetAll()
        {
            return db.Units;
        }

        public bool Update(Unit item)
        {
            if (item == null) { throw new ArgumentNullException("item"); }
            // TO DO : Code to update record into database
            var units = db.Units.Single(a => a.Id == item.Id);
            units.UnitCode = item.UnitCode;
            units.UnitName = item.UnitName;
            db.SaveChanges();
            return true;
        }
    }
}