using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AMZRaking.UI.Controllers
{
    public class ProductController : Controller
    {
        //
        // GET: /Product/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddProduct()
        {
            return PartialView("_AddProduct");
        }

        public ActionResult AddProductKeyword()
        {
            return PartialView("_AddProductKeyword");
        }

        public ActionResult EditProduct()
        {
            return PartialView("_EditProduct");
        }

        public ActionResult KeywordResearch()
        {
            return PartialView("_KeywordResearch");
        }

    }
}
