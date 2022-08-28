using System.Web;
using System.Web.Optimization;

namespace KN_KAMPUS_MERDEKA.MVC
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            /* =================================
                 STYLE
             ===================================== */
            bundles.Add(new StyleBundle("~/css/FontAwesome").Include("~/Assets/plugins/fontawesome-free/css/all.min.css"));
            bundles.Add(new StyleBundle("~/css/IonIcons").Include("~/Assets/plugins/ionicons/css/ionicons.min.css"));
            bundles.Add(new StyleBundle("~/css/tempusdominus").Include("~/Assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css"));
            bundles.Add(new StyleBundle("~/css/icheck-bootstrap").Include("~/Assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css"));
            bundles.Add(new StyleBundle("~/css/jqvmap").Include("~/Assets/plugins/jqvmap/jqvmap.min.css"));
            bundles.Add(new StyleBundle("~/css/bootstrap-toggle").Include("~/Assets/plugins/bootstrap-toggle/bootstrap-toggle.min.css"));
            bundles.Add(new StyleBundle("~/css/adminlte").Include("~/Assets/template/adminlte/css/adminlte.min.css"));
            bundles.Add(new StyleBundle("~/css/overlayScrollbars").Include("~/Assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css"));
            bundles.Add(new StyleBundle("~/css/daterangepicker").Include("~/Assets/plugins/daterangepicker/daterangepicker.css"));
            bundles.Add(new StyleBundle("~/css/bootstrap-datepicker").Include("~/Assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker.css"));
            bundles.Add(new StyleBundle("~/css/summernote").Include("~/Assets/plugins/summernote/summernote-bs4.css"));
            bundles.Add(new StyleBundle("~/css/select2").Include("~/Assets/plugins/select2/css/select2.min.css"));
            bundles.Add(new StyleBundle("~/css/bootstrap-switch").Include("~/Assets/plugins/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css"));
            bundles.Add(new StyleBundle("~/css/jquery-fancybox").Include("~/Assets/plugins/jquery-fancybox/jquery.fancybox.css"));
            bundles.Add(new StyleBundle("~/css/fontawesome-iconpicker").Include("~/Assets/plugins/fontawesome-iconpicker/css/fontawesome-iconpicker.css"));
            bundles.Add(new StyleBundle("~/css/site").Include("~/Assets/css/custom/custom.css"));
            bundles.Add(new StyleBundle("~/css/adminlte").Include("~/Assets/template/adminlte/css/adminlte.min.css"));
            bundles.Add(new StyleBundle("~/css/tui-calendar").Include("~/Assets/plugins/tui-calendar/tui-calendar.css"));


            /* =================================
              SCRIPT
            ===================================== */
            bundles.Add(new ScriptBundle("~/js/jquery").Include("~/Assets/plugins/jquery/jquery-3.4.1.min.js"));
            bundles.Add(new ScriptBundle("~/js/jquery-ui").Include("~/Assets/plugins/jquery-ui/jquery-ui.min.js"));
            bundles.Add(new ScriptBundle("~/js/select2").Include("~/Assets/plugins/select2/js/select2.min.js"));
            bundles.Add(new ScriptBundle("~/js/bootstrap").Include("~/Assets/plugins/bootstrap/js/bootstrap.bundle.min.js"));
            bundles.Add(new ScriptBundle("~/js/chart.js").Include("~/Assets/plugins/chart.js/Chart.min.js"));
            bundles.Add(new ScriptBundle("~/js/sparklines").Include("~/Assets/plugins/sparklines/sparkline.js"));
            bundles.Add(new ScriptBundle("~/js/jqvmap").Include("~/Assets/plugins/jqvmap/jquery.vmap.min.js"));
            bundles.Add(new ScriptBundle("~/js/jqvmap-map").Include("~/Assets/plugins/jqvmap/maps/jquery.vmap.usa.js"));
            bundles.Add(new ScriptBundle("~/js/jquery-knob").Include("~/Assets/plugins/jquery-knob/jquery.knob.min.js"));
            bundles.Add(new ScriptBundle("~/js/jquery-validation").Include("~/Assets/plugins/jquery-validation/jquery.validate.js"));
            bundles.Add(new ScriptBundle("~/js/moment").Include("~/Assets/plugins/moment/moment.min.js"));
            bundles.Add(new ScriptBundle("~/js/daterangepicker").Include("~/Assets/plugins/daterangepicker/daterangepicker.js"));
            bundles.Add(new ScriptBundle("~/js/bootstrap-datepicker").Include("~/Assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"));
            bundles.Add(new ScriptBundle("~/js/tempusdominus-bootstrap-4").Include("~/Assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"));
            bundles.Add(new ScriptBundle("~/js/summernote").Include("~/Assets/plugins/summernote/summernote-bs4.min.js"));
            bundles.Add(new ScriptBundle("~/js/overlayScrollbars").Include("~/Assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"));
            bundles.Add(new ScriptBundle("~/js/sweetalert2").Include("~/Assets/plugins/sweetalert2/sweetalert2.all.js"));
            bundles.Add(new ScriptBundle("~/js/jquery-fancybox").Include("~/Assets/plugins/jquery-fancybox/jquery.fancybox.js"));
            bundles.Add(new ScriptBundle("~/js/jquery-inputmask").Include("~/Assets/plugins/jquery-inputmask/jquery.inputmask.js"));
            bundles.Add(new ScriptBundle("~/js/bootstrap-toggle").Include("~/Assets/plugins/bootstrap-toggle/bootstrap-toggle.min.js"));
            bundles.Add(new ScriptBundle("~/js/jquery-dateFormat").Include("~/Assets/plugins/jquery-dateFormat/jquery-dateformat.js"));
            bundles.Add(new ScriptBundle("~/js/jquery-loading-overlay").Include("~/Assets/plugins/jquery-loading-overlay/loadingoverlay.js"));
            bundles.Add(new ScriptBundle("~/js/bootstrap-switch").Include("~/Assets/plugins/bootstrap-switch/js/bootstrap-switch.js"));
            bundles.Add(new ScriptBundle("~/js/fontawesome-iconpicker").Include("~/Assets/plugins/fontawesome-iconpicker/js/fontawesome-iconpicker.js"));
            bundles.Add(new ScriptBundle("~/js/adminlte").Include("~/Assets/template/adminlte/js/adminlte.js"));
            bundles.Add(new ScriptBundle("~/js/globals").Include("~/Assets/js/customs/global.js"));
            bundles.Add(new ScriptBundle("~/js/tui-calendar")
                .Include(
                "~/Assets/plugins/tui-calendar/tui-code-snippet.min.js",
                "~/Assets/plugins/tui-calendar/tui-time-picker.min.js",
                "~/Assets/plugins/tui-calendar/tui-date-picker.min.js",
                "~/Assets/plugins/tui-calendar/chance.min.js",
                "~/Assets/plugins/tui-calendar/tui-calendar.js"

                ));
            System.Web.Optimization.BundleTable.EnableOptimizations = false;
        }
    }
}
