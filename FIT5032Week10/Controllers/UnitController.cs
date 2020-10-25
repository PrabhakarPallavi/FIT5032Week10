using FIT5032Week10.Interface;
using FIT5032Week10.Models;
using FIT5032Week10.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FIT5032Week10.Controllers
{
    public class UnitController : ApiController
    {
        static readonly IUnitRepository1 repository = new UnitRepository();

        public IEnumerable<Unit> GetAllUnits()
        {
            return repository.GetAll();
        }
        public Unit PostUnit(Unit item)
        {
            return repository.Add(item);
        }
        public IEnumerable<Unit> PutUnit(int id, Unit unit)
        {
            unit.Id = id;
            if (repository.Update(unit))
            {
                return repository.GetAll();
            }
            else
            {
                return null;
            }
        }
        public bool DeleteUnit(int id)
        {
            if (repository.Delete(id))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
