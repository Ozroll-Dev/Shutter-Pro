using Microsoft.AspNetCore.Mvc;
using ShutterPro.Models;

namespace ShutterPro.Controllers
{
    public class HomeController : Controller
    {
        private readonly ShutterProContext dbContext;
        public HomeController(ShutterProContext _dbContext)
        {
            this.dbContext = _dbContext;
        }
        
        [HttpGet]
        public IActionResult Index()
        {
            var totalOrder = dbContext.TblProductionScheduleList.Where(p => dbContext.TblPlantationJobDetail.Any(s => s.PlantationScheduleListId == p.Id)).ToList();
            return View(totalOrder);
        }

        [HttpGet("order-entry")]
        public IActionResult OrderEntry([FromQuery] int orderId){
            var totalOrder = (from pl in dbContext.TblPlantationJobDetail
            join pl2 in dbContext.TblProductionScheduleList
            on pl.PlantationScheduleListId equals pl2.Id
            where pl.PlantationScheduleListId == orderId
            select new TblPlantationJobDetail{
            PsdetailId = pl.PsdetailId,
      PlantationScheduleListId = pl.PlantationScheduleListId,
      ShutterId = pl.ShutterId,
      Quantity = pl.Quantity,
      InstallationAreaId = pl.InstallationAreaId,
      InstallationArea = pl.InstallationArea,
      RoomLocationId = pl.RoomLocationId,
      RoomLocation = pl.RoomLocation,
      RoomLocationOther = pl.RoomLocationOther,
      Width = pl.Width,
      Height = pl.Height,
      MountConfigId = pl.MountConfigId,
      MountConfig = pl.MountConfig,
      MountStyleId = pl.MountStyleId,
      MountStyle = pl.MountStyle,
      PanelQtyId = pl.PanelQtyId,
      PanelQty = pl.PanelQty,
      BladeSizeId = pl.BladeSizeId,
      BladeSize = pl.BladeSize,
      ColourId = pl.ColourId,
      Colour = pl.Colour,
      MidRailHeight = pl.MidRailHeight,
      LayoutId = pl.LayoutId,
      Layout = pl.Layout,
      LayoutOther = pl.LayoutOther,
      MountMethodId = pl.MountMethodId,
      MountMethod = pl.MountMethod,
      HingeColourId = pl.HingeColourId,
      HingeColour = pl.HingeColour,
      FrameTypeId = pl.FrameTypeId,
      FrameType = pl.FrameType,
      SidesId = pl.SidesId  ,
      Sides = pl.Sides ,
      SlidingGuideId = pl.SlidingGuideId ,
      SlidingGuide = pl.SlidingGuide ,
      SlidingOpenCloseId = pl.SlidingOpenCloseId  ,
      SlidingOpenClose = pl.SlidingOpenClose ,
      TpostQtyId = pl.TpostQtyId  ,
      TpostQty = pl.TpostQty ,
      TpostQtyLocationId = pl.TpostQtyLocationId ,
      TpostQtyLocation = pl.TpostQtyLocation ,
      SplitBladeId = pl.SplitBladeId ,
      SplitBlade = pl.SplitBlade ,
      SplitBladeHeight = pl.SplitBladeHeight  ,
      LightBlockId = pl.LightBlockId ,
      AngleBayId = pl.AngleBayId,
      AngleBay = pl.AngleBay ,
      ToCenterTpos1 = pl.ToCenterTpos1 ,
      ToCenterTpos2 = pl.ToCenterTpos2 ,
      ToCenterTpos3 = pl.ToCenterTpos3  ,
      ToCenterTpos4 = pl.ToCenterTpos4  ,
      ToCenterTpos5 = pl.ToCenterTpos5  ,
      ToCenterTpos6 = pl.ToCenterTpos6  ,
      ToCenterTpos7 = pl.ToCenterTpos7  ,
      ToCenterTpos8 = pl.ToCenterTpos8 ,
      SpecialRequirements = pl.SpecialRequirements  ,
      CostPrice = pl.CostPrice ,
      CostPriceGst = pl.CostPriceGst ,
      ExtrasPrice = pl.ExtrasPrice ,
      ExtrasPriceGst = pl.ExtrasPriceGst ,
      SalePrice = pl.SalePrice ,
      SalePriceGst = pl.SalePriceGst  ,
      Deleted = pl.Deleted ,
      Sideboards = pl.Sideboards ,
      BayPost = pl.BayPost ,
      CornerPost = pl.CornerPost  ,
      RemakeTypeId = pl.RemakeTypeId ,
      PelmetDepth = pl.PelmetDepth,
      PlantationPriceId = pl.PlantationPriceId  ,
      BuildOut = pl.BuildOut  ,
      ConjoinedPanels = pl.ConjoinedPanels  ,
      PelmetTypeId = pl.PelmetTypeId ,
      SillCutZframeId = pl.SillCutZframeId ,
      MidRailHeight2 = pl.MidRailHeight2 ,
      BayCornerId = pl.BayCornerId,
      HorizontalTpostHeight = pl.HorizontalTpostHeight ,
      ControlTypeId = pl.ControlTypeId ,
            }).ToList();
            return View(totalOrder);
        }

        [HttpGet]
        public IActionResult TPost(){
            return View();
        }

        [HttpPost("save-entry")]
        public IActionResult SaveTPost([FromBody]TblPlantationJobDetail model){
            int result = 0;
        var plantationDetail = dbContext.TblPlantationJobDetail.FirstOrDefault(x => x.PsdetailId == model.PsdetailId && x.TpostQtyLocationId == model.TpostQtyLocationId && x.ToCenterTpos1 == model.ToCenterTpos1 && x.ToCenterTpos2 == model.ToCenterTpos2 && x.ToCenterTpos3 == model.ToCenterTpos3);
         
         if(plantationDetail != null){
            return BadRequest(new {message = "already exist",result = result});
         }else{
            var plantation = dbContext.TblPlantationJobDetail.FirstOrDefault(x => x.PsdetailId == model.PsdetailId);
            if(plantation == null){
                return BadRequest(new {message="data not found",result = result});
            }else{
               TpostChangeLog tpostChangeLog = new TpostChangeLog{
                PsdetailId = plantation.PsdetailId,
                PlantationScheduleListId = plantation.PlantationScheduleListId,
                TpostQtyId = plantation.TpostQtyId,
                TpostQty = plantation.TpostQty,
                TpostQtyLocationId = plantation.TpostQtyLocationId,
                TpostQtyLocation = plantation.TpostQtyLocation,
                ToCenterTpos1 = plantation.ToCenterTpos1,
                ToCenterTpos2 = plantation.ToCenterTpos2,
                ToCenterTpos3 = plantation.ToCenterTpos3,
                ToCenterTpos4 = plantation.ToCenterTpos4,
                ToCenterTpos5 = plantation.ToCenterTpos5,
                ToCenterTpos6 = plantation.ToCenterTpos6,
                ToCenterTpos7 = plantation.ToCenterTpos7,
                ToCenterTpos8 = plantation.ToCenterTpos8,
               };
                dbContext.TpostChangeLog.Add(tpostChangeLog);
                dbContext.SaveChanges();

                plantation.Width = model.Width;
                plantation.Height = model.Height;
                plantation.ToCenterTpos1 = model.ToCenterTpos1;
                plantation.ToCenterTpos2 = model.ToCenterTpos2;
                plantation.ToCenterTpos3 = model.ToCenterTpos3;
                plantation.ToCenterTpos4 = model.ToCenterTpos4;
                plantation.ToCenterTpos5 = model.ToCenterTpos5;
                plantation.ToCenterTpos6 = model.ToCenterTpos6;
                plantation.ToCenterTpos7 = model.ToCenterTpos7;
                plantation.ToCenterTpos8 = model.ToCenterTpos8;
                plantation.TpostQtyId = model.TpostQtyId;
                plantation.TpostQty = model.TpostQty;
                plantation.PanelQtyId = model.PanelQtyId;
                plantation.PanelQty = model.PanelQty;
                plantation.TpostQtyLocationId = model.TpostQtyLocationId;
                if(model.TpostQtyLocationId == 1){
                    plantation.TpostQtyLocation = "Center";
                }else if(model.TpostQtyLocationId == 2){
                    plantation.TpostQtyLocation = "Specify";
                }else{
                    plantation.TpostQtyLocation = null;
                }
                dbContext.TblPlantationJobDetail.Update(plantation);
                result = dbContext.SaveChanges();
                if(result > 0){
                    return Ok(new {message="success",result=result});
                }else{
                    return BadRequest(new{message="failed to save data",result = -1});
                }
            }
         }
        }

        [HttpGet("layout-frame")]
        public IActionResult LayoutFrame([FromQuery] int orderId){
            var totalOrder = (
                  from pl in dbContext.TblPlantationJobDetail
                  join pl2 in dbContext.TblProductionScheduleList
                  on pl.PlantationScheduleListId equals pl2.Id
                  where pl2.Id == orderId
                  join pl3 in dbContext.TblPanelDesign
                  on pl.PsdetailId equals pl3.PlantationJobDetailsCopyId
                  where pl3.ProductionScheduleListCopyId == orderId
            select new TblLayoutFrame{
            PsdetailId = pl.PsdetailId,
      PlantationScheduleListId = pl.PlantationScheduleListId,
      PanelDesignId = pl3.Id,
      ShutterId = pl.ShutterId,
      Quantity = pl.Quantity,
      InstallationAreaId = pl.InstallationAreaId,
      InstallationArea = pl.InstallationArea,
      RoomLocationId = pl.RoomLocationId,
      RoomLocation = pl.RoomLocation,
      RoomLocationOther = pl.RoomLocationOther,
      Width = pl.Width,
      Height = pl.Height,
      PanelQtyId = pl.PanelQtyId,
      PanelQty = pl.PanelQty,
      MidRailHeight = pl.MidRailHeight,
      FrameTypeId = pl.FrameTypeId,
      FrameType = pl.FrameType,
      TpostQtyId = pl.TpostQtyId  ,
      TpostQty = pl.TpostQty ,
      BladeSizeId = pl.BladeSizeId,
      BladeSize = pl.BladeSize,
      TpostQtyLocationId = pl.TpostQtyLocationId ,
      TpostQtyLocation = pl.TpostQtyLocation ,
      ToCenterTpos1 = pl.ToCenterTpos1 ,
      ToCenterTpos2 = pl.ToCenterTpos2 ,
      ToCenterTpos3 = pl.ToCenterTpos3  ,
      ToCenterTpos4 = pl.ToCenterTpos4  ,
      ToCenterTpos5 = pl.ToCenterTpos5  ,
      ToCenterTpos6 = pl.ToCenterTpos6  ,
      ToCenterTpos7 = pl.ToCenterTpos7  ,
      ToCenterTpos8 = pl.ToCenterTpos8 ,
      Dr = pl3.Dr,
      Slab = pl3.Slab,
      UpperSlab = pl3.UpperSlab,
      LowerSlab = pl3.LowerSlab,
      UpperGap = pl3.UpperGap,
      LowerGap = pl3.LowerGap,
            }).ToList();
            return View(totalOrder);
        }
        
        [HttpPost("save-panel")]
        public IActionResult SavePanel([FromQuery]int panelDesignId,[FromBody] TblPanelDesign model){
            int result = 0;
            var panelDesign = dbContext.TblPanelDesign.FirstOrDefault(x => x.Id == panelDesignId && x.MidRailHeight == model.MidRailHeight && x.Slab == model.Slab && x.UpperGap == model.UpperGap);
     
            if (panelDesign != null){
                return BadRequest(new{message="already exist",result = result});
            }else{
                var panel = dbContext.TblPanelDesign.Find(panelDesignId);
                if(panel == null){
                    return BadRequest(new{message="data not found",result = result});
                }else{
                    PanelChangeLog panelChangeLog = new PanelChangeLog{
                    PanelDesignId = panelDesignId,
                    Slab = panel.Slab,
                    UpperSlab = panel.UpperSlab,
                    Dr = panel.Dr,
                    MidRailHeight = panel.MidRailHeight,
                    UpperGap = panel.UpperGap,
                    LowerSlab = panel.LowerSlab,
                    LowerGap = panel.LowerGap,
                    };
                    dbContext.PanelChangeLog.Add(panelChangeLog);
                    dbContext.SaveChanges();

                    panel.MidRailHeight = model.MidRailHeight;
                    panel.Slab = model.Slab;
                    panel.UpperSlab = model.UpperSlab;
                    panel.LowerSlab = model.LowerSlab;
                    panel.UpperGap = model.UpperGap;
                    panel.LowerGap = model.LowerGap;
                    panel.Dr = model.Dr;
                    dbContext.TblPanelDesign.Update(panel);
                    result = dbContext.SaveChanges();
                    if(result > 0){
                        return Ok(new {message="success",result = result});
                    }else{
                        return BadRequest(new {message="failed to save data",result = -1});
                    }
                }
            }
        }

        [HttpGet]
        public IActionResult PanelDesign(){
            return View();
        }
    }
}

