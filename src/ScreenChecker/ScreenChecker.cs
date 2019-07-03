using System;
using System.Text;
using System.Windows.Forms;
using System.Drawing;
using Newtonsoft.Json;

namespace Dipette
{
    public class ScreenChecker
    {
        public static void Main()
        {
            while (true)
            {
                var json = Console.ReadLine();
                var command = JsonConvert.DeserializeObject<Cmd>(json);

                switch (command.Type)
                {
                    case CmdType.GET_PIXEL:
                        var pixel = GetPixelAtMousePosition();
                        
                        Console.WriteLine(JsonConvert.SerializeObject(new {
                            r = pixel.R,
                            g = pixel.G,
                            b = pixel.B,
                        }));
                        break;

                    default: 
                        throw new Exception("wrong commandtype or wrong format");
                }
            }
        }

    
        private static Color GetPixelAtMousePosition()
        {
            return GetPixel(Cursor.Position);
        }

        private static Color GetPixel(Point position)
        {
            using (var bitmap = new Bitmap(1, 1))
            {
                using (var graphics = Graphics.FromImage(bitmap))
                {
                    graphics.CopyFromScreen(position, new Point(0, 0), new Size(1, 1));
                }

                return bitmap.GetPixel(0, 0);
            }
        }
    }
}
