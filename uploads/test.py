from PIL import Image
from itertools import product
import os
import shutil
from argparse import ArgumentParser

def tile(filename, tiles):
    dir_in = ''
    dir_out = 'output/' + filename.split('.')[0]

    if tiles == 0:
        print('no tiles specified')
        return
    try:
        os.makedirs(dir_out)
    except FileExistsError:
        # Clean directory before starting
        for root, dirs, files in os.walk(dir_out):
            for f in files:
                os.unlink(os.path.join(root, f))
            for d in dirs:
                shutil.rmtree(os.path.join(root, d))
    name, ext = os.path.splitext(filename)
    img = Image.open(os.path.join(dir_in, filename))
    w, h = img.size

    d = round(w / tiles) if w > 2 * tiles else w
    
    grid = product(range(0, h-h%d, d), range(0, w-w%d, d))
    for i, j in grid:
        box = (j, i, j+d, i+d)
        out = os.path.join(dir_out, f'{name}_{i}_{j}{ext}')
        img.crop(box).save(out)


def parse_args():
    parser = ArgumentParser(description='Batch-API-Run-From-Input-Csv.')
    parser.add_argument('filepath', type=str)
    parser.add_argument('tilefactor', type=int, default=3)
    args = parser.parse_args()
    return args

if __name__ == "__main__":
    args = parse_args()
    if(os.path.exists(args.filepath)):
        tile(args.filepath, int(args.tilefactor if args.tilefactor > 0 else 1))
        print('success')
    else:
        print('failure')